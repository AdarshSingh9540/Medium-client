import Quote from "../components/Quote";
import Auth from "../components/Auth";

export const Signin = () => {
  return (
    <div className="h-screen flex justify-center items-center"> 
    <div className="w-full flex justify-center items-center"> 
      <div className="w-11/12 lg:w-1/2 flex justify-center items-center">
          <Auth type="signin" />
        </div>
        <div className="w-1/2 justify-center hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
