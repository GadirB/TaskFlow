import { Dialog } from '@headlessui/react';
import ModalWrapper from '../ModalWrapper.jsx';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import Textbox from '../Textbox.jsx';
import Loading from '../Loading.jsx';
import Button from '../Button.jsx';
import { useCreateSubTaskMutation } from '../../redux/slices/api/taskApiSlice.js';

const AddSubTask = ({ open, setOpen, id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [addSubTask, { isLoading }] = useCreateSubTaskMutation()

    const handleOnSubmit = async (data) => {
        try {
            const res = await addSubTask({ data, id }).unwrap()

            toast.success(res.message);

            setTimeout(() => {
                setOpen(false)
            }, 500)
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-white mb-4'
                    >
                        ADD SUB-TASK
                    </Dialog.Title>
                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Sub-Task title'
                            type='text'
                            name='title'
                            label='Title'
                            className='w-full rounded'
                            register={register("title", {
                                required: "Title is required!",
                            })}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <div className='flex items-center gap-4'>
                            <Textbox
                                placeholder='Date'
                                type='date'
                                name='date'
                                label='Task Date'
                                className='w-full rounded'
                                register={register("date", {
                                    required: "Date is required!",
                                })}
                                error={errors.date ? errors.date.message : ""}
                            />
                            <Textbox
                                placeholder='Tag'
                                type='text'
                                name='tag'
                                label='Tag'
                                className='w-full rounded'
                                register={register("tag", {
                                    required: "Tag is required!",
                                })}
                                error={errors.tag ? errors.tag.message : ""}
                            />
                        </div>
                    </div>
                    {isLoading ? (
                        <div className='mt-8'>
                            <Loading />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4 bg-[#1e293b]'>
                            <Button
                                type='submit'
                                className='bg-[#3b82f6] text-sm font-semibold text-white hover:bg-[#2563eb] sm:ml-3 sm:w-auto'
                                label='Add Task'
                            />

                            <Button
                                type='button'
                                className='bg-[#334155] border border-[#334155] text-sm font-semibold text-white sm:w-auto hover:bg-[#475569]'
                                onClick={() => setOpen(false)}
                                label='Cancel'
                            />
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    )
}

export default AddSubTask