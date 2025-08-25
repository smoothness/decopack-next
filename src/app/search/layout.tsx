import {sorting} from '@/libs/constants'
import {FilterList} from '@/app/search/components/FilterList'
import {Collections} from '@/app/search/components/Collections'

export default function SearchLayout({children}: {children: React.ReactNode}) {
  return (
    <div
      id="SearchLayout"
      className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 md:flex-row"
    >
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <Collections />
      </div>
      <div className="order-last min-h-screen w-full md:order-none">
        {children}
      </div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
  )
}
