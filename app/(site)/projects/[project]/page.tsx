import Image from "next/image";
import { Metadata } from "next";

import { getSingleProject } from "@/sanity/sanity.query";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import ts from "refractor/lang/typescript";

import type { ProjectType } from "@/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import fallBackImage from "@/public/project.png";
import Refractor from "react-refractor";

type Props = {
  params: {
    project: string;
  };
};

Refractor.registerLanguage(ts);

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return {
    title: `${project.name} | Project`,
    description: project.tagline,
    openGraph: {
      images:
        project.coverImage?.image ||
        "https://res.cloudinary.com/victoreke/image/upload/v1689892912/docs/project.png",
      title: project.name,
      description: project.tagline,
    },
  };
}

const SampleImageComponent = ({ value }: { value: any }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlBuilder().image(value).width(800).fit("max").auto("format").url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

const Code = (props: any) => (
  <Refractor
    language={props.value.language}
    value={props.value.code}
    markers={props.value.highlightedLines}
  />
);

const components: PortableTextComponents = {
  types: {
    image: SampleImageComponent,
    code: Code,
  },
  block: {
    h3: ({ children }) => <h3 className="text-2xl font-bold">{children}</h3>,
    h4: ({ children }) => (
      <h4 className="text-2xl font-semibold">{children}</h4>
    ),
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          className="text-purple-400"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await getSingleProject(slug);

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-bold lg:text-5xl text-3xl lg:leading-tight mb-4">
            {project.name}
          </h1>

          <a
            href={project.projectUrl}
            rel="noreferrer noopener"
            className="dark:bg-[#1d1d20] bg-zinc-50 dark:text-white text-zinc-600 dark:hover:border-zinc-700 hover:border-zinc-200 border border-transparent rounded-md px-4 py-2"
          >
            Explore
          </a>
        </div>

        <Image
          className="rounded-xl border dark:border-zinc-800 border-zinc-100"
          width={900}
          height={460}
          src={project.coverImage?.image || fallBackImage}
          alt={project.coverImage?.alt || project.name}
        />

        <div className="flex flex-col gap-y-6 mt-8 leading-7 dark:text-zinc-400 text-zinc-600">
          <PortableText value={project.description} components={components} />
        </div>
      </div>
    </main>
  );
}
