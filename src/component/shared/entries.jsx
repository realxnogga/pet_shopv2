
import { useEffect } from "react";
import { useTableData } from "../../store/shared/tabledata";

export const Entries = () => {

    const getEntries = useTableData(state => state.getEntries);
    const entries = useTableData(state => state.entries);

    useEffect(() => {
       getEntries(entries);
    }, [entries, getEntries]);

    return (
        <p>
            show
            <span>
                <select
                   value={entries}
                    onChange={(e) => { getEntries(e.target.value) }}
                 
                    className="outline-none">
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="15">15</option>
                </select>
            </span>
            entries
        </p>
    )
}