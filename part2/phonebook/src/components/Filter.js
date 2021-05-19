const Filter= ({handleSearchChange, newSearch}) => {
    return (
        <div>
            filter shown with: <input onChange ={handleSearchChange} value={newSearch} />
        </div>
    )
}

export default Filter;