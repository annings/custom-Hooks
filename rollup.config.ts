/* eslint-disable import/no-extraneous-dependencies */
/** @format */
import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import typescript from 'rollup-plugin-typescript2';

const esOutput = {
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named'
};

export default {
    input: 'src/index.tsx',
    output: [
        {
            dir: 'esm',
            format: 'esm',
            ...esOutput
        },
        {
            dir: 'cmj',
            format: 'cjs',
            ...esOutput
        },
        {
            file: 'dist/iife_bundle.js',
            name: 'iife',
            format: 'iife',
            sourcemap: false
        },
        { file: 'dist/bundle.cjs.js', format: 'cjs', sourcemap: false },
        { file: 'dist/bundle.esm.js', format: 'esm', sourcemap: false }
    ],

    external: ['react', 'react-dom'],

    // 是否开启代码分割
    experimentalCodeSplitting: true,
    plugins: [
        json(),

        eslint({
            fix: true,
            include: ['src/*.ts', 'src/*.tsx', 'src/*.js', 'src/*.jsx'],
            exclude: ['node_modules/**']
        }),

        resolve({ extensions: ['.tsx', '.ts', '.jsx', '.js'] }),

        typescript(),

        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        commonjs({
            exclude: ['node_modules/**']
        }),
        babel({
            exclude: ['node_modules/**']
        })

        // env === 'production' && terser()
    ]
};
