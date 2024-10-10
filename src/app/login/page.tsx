import {  login} from "@/lib/auth";


export default async function AdminLogin() {
  

  return (
    <>
      <form
        className="flex justify-center h-screen items-center"
        action={async (formData) => {
          "use server";
          await login(formData);
        }}
      >
        <div className="flex flex-col p-5 shadow-2xl bg-white">
        <div>
          <label htmlFor="email">Enter email:</label>
          <input
            className="border-black border-2 w-full rounded-xl"
            type="text"
            name="email"
            id="email"
          ></input>
        </div>

        <div>
          <label htmlFor="password">Enter password:</label>
          <input
            className="border-black border-2 w-full rounded-xl"
            type="text"
            name="password"
            id="password"
          ></input>
        </div>
        <button className="border-black border-2 mt-5 bg-green-300" type="submit">
          Login
        </button>
        </div>
      </form>

     
    </>
  );
}
