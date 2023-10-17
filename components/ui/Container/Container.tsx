import classNames from 'classnames';

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  direction?: 'col' | 'row';
}

export const Container = ({ children, direction }: ContainerProps) => {
  const classes = classNames(
    `flex  text-center gap-5 flex-${direction} place-content-center`
  );
  return <div className={classes}>{children}</div>;
};
