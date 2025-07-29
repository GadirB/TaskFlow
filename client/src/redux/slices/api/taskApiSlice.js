import { TASKS_URL } from "../../../utils/constants";
import { apiSlice } from "../apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/create`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),

        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASKS_URL}/duplicate/${id}`,
                method: 'POST',
                body: {},
                credentials: 'include',
            }),
        }),

        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/update/${data.id}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
        }),

        getAllTask: builder.query({
            query: ({ strQuery, trash, search }) => ({
                url: `${TASKS_URL}?stage=${strQuery}&trash=${trash}&search=${search}`,
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (response) => {
                if (Array.isArray(response)) {
                    return {
                        tasks: response.map(task => ({
                            ...task,
                            _id: task.id,
                            activities: task.TaskActivities || [],
                            subTasks: task.SubTasks || [],
                            assets: task.TaskAssets || [],
                            links: task.TaskLinks || []
                        }))
                    };
                }
                return response;
            },
        }),

        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TASKS_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        createSubTask: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASKS_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        postTaskActivity: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASKS_URL}/activity/${id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        trashTask: builder.mutation({
            query: ({ id, isDeleted }) => ({
                url: `${TASKS_URL}/${id}`,
                method: "PUT",
                body: { isDeleted },
                credentials: "include",
            }),
        }),

        deleteRestoreTask: builder.mutation({
            query: ({ id, restore }) => ({
                url: `${TASKS_URL}/delete-restore/${id}?restore=${restore}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),

        getDasboardStats: builder.query({
            query: () => ({
                url: `${TASKS_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),

        changeTaskStage: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/change-stage/${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        changeSubTaskStatus: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/change-status/${data?.id}/${data?.subId}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
    })
})

export const {
  usePostTaskActivityMutation,
  useCreateTaskMutation,
  useGetAllTaskQuery,
  useCreateSubTaskMutation,
  useTrashTaskMutation,
  useDeleteRestoreTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useGetSingleTaskQuery,
  useGetDasboardStatsQuery,
  useChangeTaskStageMutation,
  useChangeSubTaskStatusMutation,
} = postApiSlice;