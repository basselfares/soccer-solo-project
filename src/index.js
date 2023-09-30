require('file-loader?name=[name].[ext]!./index.html')
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { Search, TeamBuilder } from './TeamBuilder.jsx';
import styles from './App.scss'

const appElement = document.getElementById('app');
const root = createRoot(appElement)
root.render(<TeamBuilder />)