
import { IoSearch } from "react-icons/io5";

export const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChangeFunc = (e) => {
        setSearchQuery(e.target.value)
    }
    
    const filteredProductData = returnedtTableDataFromPagination.filter(item => {
        const temp = item.productname.toLowerCase().includes(searchQuery.toLowerCase());
        return temp;
    });

    return (
        <div className='flex'>
            <IoSearch className='h-[2.5rem] w-[2.5rem] p-[.5rem] bg-white' />
            <input
                value={searchQuery}
                onChange={handleSearchQueryChangeFunc}
                type="text"
                placeholder='search product name'
                className="h-[2.5rem] rounded-sm outline-none" />
        </div>
    )
}