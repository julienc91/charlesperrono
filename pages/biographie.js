import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useIntl } from 'react-intl'
import Layout from '../components/layout'
import { getBiography } from '../lib/api'

const Biography = ({ biography, preview }) => {
  const { formatMessage } = useIntl()
  const t = id => formatMessage({ id })
  return (
    <Layout preview={preview}>
      <div className='view biography'>
        <h1 className='title'>{t('Biography.title')}</h1>

        <img src={`${biography.image.url}?w=350`} alt={biography.image.title} />
        <article>
          {documentToReactComponents(biography.content.json, {})}
        </article>
      </div>
    </Layout>
  )
}

export default Biography

export const getStaticProps = async ({ locale, preview }) => {
  const biography = await getBiography(locale, preview)
  return {
    props: {
      biography,
      preview
    }
  }
}
