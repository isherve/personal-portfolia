import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";

const ThemeProvider = ({ children, ...props }: ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} {...props}>
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
