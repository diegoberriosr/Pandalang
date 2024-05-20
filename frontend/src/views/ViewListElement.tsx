import React from 'react'

const ViewListElement = ({styling, children}) => {
  return (
    <li className={`${styling} w-full flex items-center justify-between px-5 py-2.5 border-t-2 border-gray-200`}>
      {children}
    </li>
  )
}

export default ViewListElement
