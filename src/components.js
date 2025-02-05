'use strict'

import { Flex, Link } from 'smbls'
import gridSettings from '../gridSettings.json';

export const Header = {
  extend: Flex,
  props: {
    minWidth: '100%',
    padding: 'Z B',
    align: 'center space-between'
  },

  Flex: {
    props: { gap: 'C' },
    childExtend: {
      extend: Link,
      props: ({ props }) => ({
        textDecoration: window.location.pathname === props.href ? 'underline' : 'none'
      })
    },
    Text_logo: { href: '/', text: 'Hello!' },
    Text_about: { href: '/about', text: 'About' }
  },

  ThemeSwitcher: {}
}

export const ThemeSwitcher = {
  extend: Flex,
  props: { gap: 'A2' },
  childExtend: {
    props: (element, state) => ({
      active: state.globalTheme === element.key,
      cursor: 'pointer',
      '.active': {
        fontWeight: '900'
      }
    }),
    on: {
      click: (event, element, state) => {
        state.update({ globalTheme: element.key })
      }
    }
  },
  dark: { text: 'Dark' },
  light: { text: 'Light' },
  midnight: { text: 'Midnight' }
}

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}

/* 
  -------------------------------------------------
  ADDED BELOW: GridSelection
  -------------------------------------------------
*/

export const GridSelection = {
  extend: 'Flex',
  state: {
    columns: gridSettings.colCount || 16,
    rows: gridSettings.rowCount || 8,
    selectedX: 0,
    selectedY: 0,
    selectedCells: {},
  },
  props: {
    flow: 'column',
    align: 'center start',
    gap: 'A',
    padding: 'Z B',
    background: '#fff .08',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto' 
  },

  child: [
    {
      tag: 'H2',
      text: 'Grid Selection'
    },

    {
      extend: 'Grid',
      props: ({ state }) => ({
        templateColumns: `repeat(${state.columns}, 1fr)`,
        gap: '4px',
        width: '100%'
      }),
      childExtend: {
        extend: 'Box',
        key: ({ state }) => `${state.x}-${state.y}`,
        props: ({ state }) => {
          const isSelected = state.x <= state.parent.selectedX && state.y <= state.parent.selectedY
          return {
            width: '20px',
            height: '20px',
            aspectRatio: '1 / 1',
            border: isSelected ? '1px solid #0070f3' : '1px solid #8882',
            background: isSelected ? '#0070f3' : 'transparent',
            cursor: 'pointer'
          }
        },
        on: {
          click: (e, elem, state) => {
            state.parent.update({ selectedX: state.x, selectedY: state.y })
          }
        }
      },
      $stateCollection: ({ state }) => {
        const cells = []
        for (let y = 1; y <= state.rows; y++) {
          for (let x = 1; x <= state.columns; x++) {
            cells.push({
              x,
              y,
            })
          }
        }
        return cells
      }
    },

    {
      key: 'stats',
      extend: 'Flex',
      props: {
        width: '100%',
        padding: 'Z B Z B',
        margin: 'A auto',
        align: 'center space-between'
      },
      child: [
        {
          text: (el, st) => (
            `Selection coordinates: ${st.selectedX},${st.selectedY}`
          )
        },
        {
          text: (el, st) => {
            const totalSelected = st.selectedX * st.selectedY
            return `Total cells selected: ${totalSelected}`
          }
        }
      ]
    }
  ]
}
