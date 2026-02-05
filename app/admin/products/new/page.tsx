import { PageHeader } from '../../_components/PageHeader'
import { ProductForm } from '../_components/ProductForm'

export default function NewProductPage() {
  return (
    <>
      <PageHeader
        title="Add product"
        subtitle="Create a new listing with pricing, imagery, and download file."
      />
      <ProductForm />
    </>
  )
}
