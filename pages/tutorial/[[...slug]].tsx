import { allTutorials } from 'contentlayer/generated'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'

export default function Page({
  tutorial,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(tutorial.body.code)
  return (
    <Layout frontMatter={tutorial.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tutorials = allTutorials
    .map((t) => t._id.replace('tutorial/', '').replace('.mdx', ''))
    .map((id) => ({ params: { slug: id.split('/') } }))
  return { paths: tutorials, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]

  const tutorial = allTutorials.find((tutorial) =>
    tutorial._id.includes(params.join('/')),
  )
  return { props: { tutorial } }
}
