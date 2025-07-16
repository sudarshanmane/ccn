export const Auth = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-slack">
      <div className="md:h-auto md:w-[420px] ">{children}</div>
    </div>
  );
};
