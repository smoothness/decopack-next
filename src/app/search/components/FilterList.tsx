import FilterItem, {ListItem} from '@/app/search/components/FilterItem'
import FilterItemDropdown from '@/app/search/components/Dropdown'

export function FilterList({list, title}: {list: ListItem[]; title?: string}) {
  return (
    <nav id="FilterList">
      {title ? (
        <h3 className="hidden text-xs text-neutral-500 md:block">{title}</h3>
      ) : null}
      <ul className="hidden md:block">
        <FilterItemList list={list} />
      </ul>
      <ul className="md:hidden">
        <FilterItemDropdown list={list} />
      </ul>
    </nav>
  )
}

function FilterItemList({list}: {list: ListItem[]}) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  )
}
