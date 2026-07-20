import db from "./firestore.js"
import { CollectionReference, Timestamp } from "@google-cloud/firestore";
import { TASK_STATUS } from "../constants/taskbotConstants.js"

/**
 * タスク作成
 * @param {string} userId 
 * @param {object} taskData 
 * @returns {string} taskId
 */
export async function createTask(userId, taskData) {
  //現在時刻を取得
  const now = Timestamp.now();
  try {
    //タスク追加
    const docRef = await getTaskCollection(userId)
      .add({
        title: taskData.title,
        description: taskData.description ?? "",
        status: TASK_STATUS.TODO,
        createdAt: now,
        updatedAt: now
      });

    console.log("タスク追加完了");
    return docRef.id;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * タスク一覧を取得
 * @param {string} userId 
 * @param {object} filters 
 * @returns {[object]} (id: taskId) を含んだタスクリスト
 */
export async function getTasks(userId, filters = {}) {
  //userIDのクエリを作成
  let query = getTaskCollection(userId);

  //フィルターをクエリに適用
  for (const [field, value] of Object.entries(filters)) {
    query = query.where(field, "==", value);
  }
  //並べ替え
  query = query.orderBy("createdAt");

  //タスクリストのスナップショットを取得
  const snapshot = await query.get();

  //タスクIDを追記、形式を整える
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * タスク更新
 * @param {string} userId 
 * @param {string} taskId 
 * @param {object} taskData 
 * @returns {string} taskId
 */
export async function updateTask(userId, taskId, taskData) {
  //タイムスタンプ更新
  taskData.updatedAt = Timestamp.now();
  try {
    await getTaskCollection(userId).doc(taskId).update(taskData);

    console.log("タスク更新完了");
    return taskId;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * タスク削除
 * @param {string} userId 
 * @param {string} taskId 
 * @returns {boolean} 削除成功:true/失敗:false
 */
export async function deleteTask(userId, taskId) {
  try {
    //コレクション取得
    const taskref = getTaskCollection(userId);

    //削除対象タスク取得
    const snapshot = await taskref.get();

    //指定タスクが存在しない場合はfalseを返す
    if (!snapshot.exists) {
      console.log("指定タスクが存在しません");
      return false;
    }

    //タスク削除
    await taskref.doc(taskId).delete();

    console.log("タスク削除完了");
    return true;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * userIdのtaskコレクションを取得
 * @param {string} userId 
 * @returns {CollectionReference} コレクション
 */
function getTaskCollection(userId) {
  return db
    .collection("users")
    .doc(userId)
    .collection("tasks");
}