import { HTMLAttributes, ReactNode } from "react";

interface ArticleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Article = ({
  children,
  className = "",
  ...props
}: ArticleProps) => {
  return (
    <article
      className={`${className} flex flex-col font-normal text-gray-400 [&_:where(h1,h2,h3,h4,h5,h6)+p]:mt-3 [&_h1]:text-4xl [&_h1,h2,h3,h4,h5,h6]:font-bold [&_h1,h2,h3,h4,h5,h6]:text-white [&_h2,h3,h4,h5,h6]:text-3xl [&_p+p]:mt-2`}
      {...props}
    >
      {children}
    </article>
  );
};
