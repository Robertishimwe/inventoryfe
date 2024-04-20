import { useRef } from "react";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom"
import { useAtom } from 'jotai';
import { loggedinUserAtom } from "../utils/atoms";
import api from "../utils/api";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const [loggedinUser, setLoggedinUser] = useAtom(loggedinUserAtom);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (loginCredentials) => {
      return api.post('/api/auth/login', loginCredentials);
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      setLoggedinUser(data?.data);
      window.location.replace("/dashboard");
    },
    onError: (error) => {
      console.log('Login error:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value)
    mutate({ email: emailRef.current.value, password: passwordRef.current.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen opacity-80">
      <div className="max-w-md w-full space-y-8 p-4 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Inventory MS Login</h2>
          <p className="text-gray-500">Enter your credentials to access the system.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" for="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              id="username"
              placeholder="Enter your username"
              required
              type="text"
              ref={emailRef}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" for="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              id="password"
              placeholder="Enter your password"
              required
              type="password"
              ref={passwordRef}
            />
          </div>
          <button
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md py-2 transition-colors duration-300 transform hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="text-red-500 text-center">{error?.response?.data?.message}</p>}
        </form>
      </div>
    </div>
  )
}








































// import { useRef } from "react";
// import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { loggedinUserAtom } from "../utils/atoms";
// import api from "../utils/api";

// export default function Login() {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const navigate = useNavigate();

//   const [loggedinUser, setLoggedinUser] = useAtom(loggedinUserAtom);

//   const { mutate, isPending, error } = useMutation({
//     mutationFn: (loginCredentials) => {
//       return api.post('/api/auth/login', loginCredentials);
//     },
//     onSuccess: (data) => {
//       console.log('Login successful:', data);
//       setLoggedinUser(data?.data);
//       window.location.replace("/dashboard");
//     },
//     onError: (error) => {
//       console.log('Login error:', error);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(emailRef.current.value, passwordRef.current.value)
//     mutate({ email: emailRef.current.value, password: passwordRef.current.value });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="max-w-md w-full space-y-8 p-4 bg-white shadow-lg rounded-lg">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-800">Inventory Ms Login</h2>
//           <p className="text-gray-500">Enter your credentials to access the system.</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700" for="username">
//               Username
//             </label>
//             <input
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
//               id="username"
//               placeholder="Enter your username"
//               required
//               type="text"
//               ref={emailRef}
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700" for="password">
//               Password
//             </label>
//             <input
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
//               id="password"
//               placeholder="Enter your password"
//               required
//               type="password"
//               ref={passwordRef}
//             />
//           </div>
//           <button
//             className="w-full bg-indigo-500 text-white rounded-md py-2 transition-colors duration-300 transform hover:bg-indigo-600 hover:scale-105 focus:outline-none focus:ring focus:ring-indigo-300"
//             type="submit"
//             disabled={isPending}
//           >
//             {isPending ? 'Loading...' : 'Login'}
//           </button>
//           {error && <p className="text-red-500 text-center">{error?.response?.data?.message}</p>}
//         </form>
//       </div>
//     </div>
//   )
// }
















// import { useRef } from "react";
// import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from "react-router-dom"
// import { useAtom } from 'jotai';
// import { loggedinUserAtom } from "../utils/atoms";
// import api from "../utils/api";

// export default function Login() {

//     const emailRef = useRef(null);
//     const passwordRef = useRef(null);
//     const navigate = useNavigate();

//     const [loggedinUser, setLoggedinUser] = useAtom(loggedinUserAtom);

//     const { mutate, isPending, error } = useMutation({
//         mutationFn: (loginCredentials) => {
//           return api.post('/api/auth/login', loginCredentials);
//         },
//         onSuccess: (data) => {
//           console.log('Login successful:', data);
//           setLoggedinUser(data?.data);
//           window.location.replace("/dashboard");
//           // navigate('/dashboard', { replace: true, state: { refresh: true } });
//           // navigate('/dashboard')
    
//         },
//         onError: (error) => {
//           console.log('Login error:', error);
//         },
//       });



//       const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(emailRef.current.value, passwordRef.current.value)
//         mutate({ email: emailRef.current.value, password: passwordRef.current.value });
//       };


//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="max-w-md w-full space-y-8 p-4">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold">Inventory Ms Login</h2>
//             <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access the system.</p>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium" for="username">
//                 Username
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-900 dark:text-gray-200"
//                 id="username"
//                 placeholder="Enter your username"
//                 required
//                 type="text"
//                 ref={emailRef}
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="block text-sm font-medium" for="password">
//                 Password
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-900 dark:text-gray-200"
//                 id="password"
//                 placeholder="Enter your password"
//                 required
//                 type="password"
//                 ref={passwordRef} 
                
//               />
//             </div>
//             <button
//               className="w-full bg-gray-900 text-white rounded-md py-2 transition-colors hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
//               type="submit"
//               disabled={isPending}
//             >
//               {isPending ? 'Loading...' : 'Login'}
//             </button>
//             {error && <p className="text-red-500 text-center">{error?.response?.data?.message}</p>}
//           </form>
//         </div>
//       </div>
//     )
//   }
  
  