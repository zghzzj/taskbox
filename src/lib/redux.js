// 一个简单的 redux store/actions/reducer 实现。
// 一个真正的应用程序将更复杂，并分为不同的文件.
import { createStore } from 'redux';
// 这些行为是可能发生的store变化的“名称”
export const actions = {
    ARCHIVE_TASK: 'ARCHIVE_TASK',
    PIN_TASK: 'PIN_TASK',
};
// 动作创建者是将动作与 要求的数据捆绑在一起的方式
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });
// 我们所有的Reducer都只是改变了一个任务的状态。
function taskStateReducer(taskState) {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(
                task => (task.id === action.id ? { ...task, state: taskState } : task)
            ),
        };
    };
};
// reducer描述了 Store 中每个 action 如何改变内容
export const reducer = (state, action) => {
    switch (action.type) {
        case actions.ARCHIVE_TASK:
            return taskStateReducer('TASK_ARCHIVED')(state, action);
        case actions.PIN_TASK:
            return taskStateReducer('TASK_PINNED')(state, action);
        default:
            return state;
    }
};
// 应用加载时我们Store 的初始状态。
// 通常你会从服务器上获取它
const defaultTasks = [
    { id: '1', title: 'Something', state: 'TASK_INBOX' },
    { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];
// 我们导出构造的 redux store
export default createStore(reducer, { tasks: defaultTasks });