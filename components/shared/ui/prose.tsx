import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        "prose mx-auto max-w-6xl font-sans text-base leading-relaxed text-slate-600 prose-headings:mt-10 prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-mitologi-navy prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-mitologi-navy prose-a:font-semibold prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:text-mitologi-gold prose-strong:text-slate-900 prose-strong:font-bold prose-ol:mt-6 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-6 prose-ul:list-disc prose-ul:pl-6 prose-img:rounded-2xl prose-img:shadow-soft",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
