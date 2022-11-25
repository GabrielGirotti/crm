const Error = ({ children }) => {
  return (
    <div className="text-center my-4 bg-red-800 text-white uppercase font-bold p-6">
      {children}
    </div>
  );
};

export default Error;
