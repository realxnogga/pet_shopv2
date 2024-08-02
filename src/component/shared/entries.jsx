
import { useEffect, useState } from "react";
import { useTableData } from "../../store/shared/pagination";

export const Entries = ({design}) => {

    const getEntries = useTableData(state => state.getEntries);

    const [ent, setEnt] = useState(5);

    useEffect(() => {
        getEntries(ent);
    }, [ent]);

    return (
        <p>
            show
            <span>
                <select
                    value={ent}
                    onChange={(e) => { setEnt(e.target.value) }}
                    className={`${design} outline-none`}>
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="15">15</option>
                </select>
            </span>
            entries
        </p>
    )
}