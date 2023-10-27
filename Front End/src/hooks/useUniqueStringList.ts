import { useState } from "react";

function useUniqueStringList(initialStrings: string[]) {
   const [array, setArray] = useState<string[]>(initialStrings);

   function addString(newString: string) {
      if (newString && !array.includes(newString)) {
         setArray(function (prevArr) {
            return [...prevArr, newString];
         });
      }
   }

   function removeString(stringToRemove: string) {
      setArray(function (prevArr) {
         const updatedArray = prevArr.filter(function (str) {
            return str !== stringToRemove;
         });
         return updatedArray;
      });
   }

   function includes(stringToSearch: string) {
      return array.includes(stringToSearch);
   }

   function map(func: (str: string, index: number) => any) {
      return array.map(func);
   }

   function clear() {
      setArray([]);
   }

   return {
      array,
      addString,
      removeString,
      includes,
      map,
      clear,
   };
}

export default useUniqueStringList;
