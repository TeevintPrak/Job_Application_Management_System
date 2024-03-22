export default function ParseFilter(filters) {
    const sql = filters.map((filter) => {
        let string = "";
        if (filter.type != null) {
            string = `${filter.type} ${filter.attribute} = '${filter.equals}'`;
        } else {
            // first element with no AND/OR clause 
            string = `${filter.attribute} = '${filter.equals}'`;
        }

        return string;
    });

    return sql.join(' ');
}