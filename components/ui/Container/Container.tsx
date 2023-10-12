import classNames from 'classnames';

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  direction?: 'col' | 'row';
}

export const Container = ({ children, direction }: ContainerProps) => {
  const classes = classNames(
    `flex justify-between text-center gap-4 flex-${direction}`
  );
  return <div className={classes}>{children}</div>;
};
