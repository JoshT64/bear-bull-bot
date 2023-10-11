interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex justify-between  flex-col text-center  gap-4 ">
      {children}
    </div>
  );
};
