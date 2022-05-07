import { allFAQs } from '.contentlayer/generated'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'

export default function Page({
  faq,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(faq.body.code)
  return (
    <Layout frontMatter={faq.frontMatter}>
      <Component components={MDXComponents} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const faqs = allFAQs
    .map((t) =>
      t._id.replace('faq/', '').replace('.mdx', '').replace('index', ''),
    )
    .map((id) => ({ params: { slug: id.split('/') } }))
  return { paths: faqs, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const params = Array.isArray(ctx.params.slug)
    ? ctx.params.slug
    : [ctx.params.slug]

  const faq = allFAQs.find((faq) => faq._id.includes(params.join('/')))
  return { props: { faq } }
}
