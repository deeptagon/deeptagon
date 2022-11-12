/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react"
import Fuse from "fuse.js"

/**
 * @typedef {Object} IData
 * @template {keyof IData} TDataColumn
 * @property {string|number} [index]
 * @description This hook fuzzy searches given tabular data.
 * 
 * @param {IData[]} data Tabular data to be searched
 * @param {TDataColumn[]} columns Columns of data to be searched
 * @param {string} query Search query
 * @returns results
 */

export const useSearch = (data = [], columns = [], query = "") => {
  const [results, setResults] = useState([])
  const index = useMemo(() => {
    if (data.length) {
      const options = {
        includeScore: false,
        threshold: 0.2,
        keys: columns
      }
      return new Fuse(data, options)
    }
    return null
  }, [JSON.stringify({ data, columns })])

  useEffect(() => {
    if (index) {
      const trimmed = query.trim()
      const filtered = trimmed.length === 0
        ? []
        : index.search(trimmed).map(i => i.refIndex)

      setResults(filtered)
    }
  }, [JSON.stringify(data), query.trim()])
  return results
}