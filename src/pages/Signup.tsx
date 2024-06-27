import Quote from "../components/Quote";
import Auth from "../components/Auth";

export const Signup = () => {
  return (
    <div className="h-screen lg:flex justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 flex justify-center">
          <Auth type="signup" />
        </div>
        <div className="w-1/2 flex justify-center hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
