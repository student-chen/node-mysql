module.exports = {
    root: true,
    env: {
        jest: true,
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: 'eslint:recommended',
    // 0.关闭规则 1.开启警告规则 2.开启错误规则
    rules: {
        'no-alert': 0, // 禁止使用alert confirm prompt
        'prefer-const': 0, // 建议使用 const 关闭
        'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-dupe-args': 2, // 函数参数不能重复
        'no-duplicate-imports': [1, { includeExports: true }], // 不允许重复导入
        'space-before-function-paren': [1, 'always'], // 函数定义时括号前面要不要有空格
        'space-in-parens': [0, 'never'], // 小括号里面要不要有空格
        eqeqeq: 0, // 必须使用全等
        'no-var': 0, // 禁用var，用let和const代替
        "no-multi-spaces": 1, // 不能用多余的空格
        "key-spacing": [1, {"beforeColon": false, "afterColon": true}],// 对象字面量中冒号的前后空格
        "consistent-return": 2, // return 后面是否允许省略
        "no-irregular-whitespace": 2, //不允许出现不规则的空格
        "no-eq-null": 2, //不允许对null用==或者!=
        "new-cap": [2, {"newIsCap": true, "capIsNew": false}], //构造函数名字首字母要大写
    },
    overrides: [],
    parserOptions: {ecmaVersion: 'latest'},
    globals: {process: true, Buffer: true}
}
