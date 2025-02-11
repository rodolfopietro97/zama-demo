/**
 * Title typography component
 */
export const Title = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <h1 className="text-2xl md:text-4xl xl:text-6xl font-bold">{children}</h1>
  );
};

/**
 * Subtitle typography component
 */
export const Subtitle = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <h2 className="text-xl md:text-2xl xl:text-4xl max-w-3xl">{children}</h2>
  );
};
