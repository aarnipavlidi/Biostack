// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this hooks usage.
import { useDebounce } from 'use-debounce';

const useProductFilter = () => {

  const [searchStatus, setSearchStatus] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(currentSearchValue, 1000);

  const activateSearchBar = () => {
    setSearchStatus(true)
  };

  const resetSearchBar = () => {
    setSearchStatus(false)
    setCurrentSearchValue('')
  };

  return {
    searchStatus,
    activateSearchBar,
    resetSearchBar,
    currentSearchValue,
    setCurrentSearchValue,
    debouncedSearchValue
  };
};

// Export "useProductFilter" hook, so other components like "App.js" are able to use this hooks's content.
export default useProductFilter;
