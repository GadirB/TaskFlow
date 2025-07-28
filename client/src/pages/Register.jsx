import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [role, setRole] = useState("user");

  const password = watch("password");

  const handleRegister = async (data) => {
    try {
      const userData = {
        ...data,
        role,
      };
      
      await registerUser(userData).unwrap();
      toast.success("Kullanıcı başarıyla oluşturuldu! Giriş yapabilirsiniz.");
      navigate("/log-in");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Bir hata oluştu");
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base dark:border-gray-700 dark:text-blue-400 border-gray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center dark:text-gray-400 text-blue-700'>
              <span>Cloud-based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Hesap Oluştur
              </p>
              <p className='text-center text-base text-gray-700 dark:text-gray-500'>
                Yeni kullanıcı hesabı oluşturun
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='Ad Soyad'
                type='text'
                name='name'
                label='Ad Soyad'
                className='w-full rounded-full'
                register={register("name", {
                  required: "Ad Soyad gereklidir!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder='Ünvan'
                type='text'
                name='title'
                label='Ünvan'
                className='w-full rounded-full'
                register={register("title", {
                  required: "Ünvan gereklidir!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder='you@example.com'
                type='email'
                name='email'
                label='E-posta Adresi'
                className='w-full rounded-full'
                register={register("email", {
                  required: "E-posta adresi gereklidir!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Geçerli bir e-posta adresi giriniz"
                  }
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <div className='flex flex-col gap-2'>
                <label className='text-slate-800 dark:text-slate-200 text-sm'>Rol</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='w-full rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='user'>Kullanıcı</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
              <Textbox
                placeholder='Şifre'
                type='password'
                name='password'
                label='Şifre'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Şifre gereklidir!",
                  minLength: {
                    value: 6,
                    message: "Şifre en az 6 karakter olmalıdır"
                  }
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <Textbox
                placeholder='Şifre Tekrar'
                type='password'
                name='confirmPassword'
                label='Şifre Tekrar'
                className='w-full rounded-full'
                register={register("confirmPassword", {
                  required: "Şifre tekrarı gereklidir!",
                  validate: (value) => value === password || "Şifreler eşleşmiyor"
                })}
                error={errors.confirmPassword ? errors.confirmPassword.message : ""}
              />
            </div>
            <div className='flex flex-col gap-3'>
              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type='submit'
                  label='Hesap Oluştur'
                  className='w-full h-10 bg-blue-700 text-white rounded-full'
                />
              )}
              <Button
                type='button'
                label='Giriş Sayfasına Dön'
                onClick={() => navigate("/log-in")}
                className='w-full h-10 bg-green-600 text-white rounded-full'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;