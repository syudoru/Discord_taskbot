import { CollectionReference } from "@google-cloud/firestore";
import db from "./firestore.js";
import { TASK_PRIORITY } from "../constants/taskbotConstants.js"

const optionPreset = {
  defaultPriority: TASK_PRIORITY.MIDDLE,
  defaultCategory: "(default)",
  categories: ["(default)"],
};

export async function GetOptions(userId, title) {
  try {
    //optionsドキュメント取得
    const snapshot = await getUserDataCollection(userId).doc("options").get();
    let options = snapshot.data();

    //オプションが存在しなければ新規作成
    if (!options) {
      CreateOptions(userId);
    }
    //そのオプション項目がない場合、プリセットで埋める
    else if (options[title] == undefined) {
      options = { ...optionPreset, ...options };
      await SetOptions(userId, options);
    }

    return options[title];
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}


export async function SetOptions(userId, options) {
  try {
    await getUserDataCollection(userId).doc("options").update(options);

    //オプションが存在しないときの処理を加える。

    console.log("オプション更新完了");
    return;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

async function CreateOptions(userId) {
  await getUserDataCollection(userId).doc("options").set(optionPreset);
  console.log("オプションを新規作成しました");
  return;
}

export async function GetLog(userId, title) {
  try {
    //logsドキュメント取得
    let logs = await getUserDataCollection(userId).doc("logs").get();

    //そのログ項目がない場合、エラーを投げる
    if (logs[title] == undefined) {
      const error = new Error(`指定項目がありません: ${title}`);
      throw error;
    }

    return logs[title];
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

export async function SetLog(userId, title, log) {
  try {
    //logsドキュメント取得
    let logs = await getUserDataCollection(userId).doc("logs").set({ [title]: log });

    console.log("ログ追加完了")
    return;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * userIdのuserDataコレクションを取得
 * @param {string} userId 
 * @returns {CollectionReference} コレクション
 */
function getUserDataCollection(userId) {
  return db
    .collection("users")
    .doc(userId)
    .collection("userData");
}