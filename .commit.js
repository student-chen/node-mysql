// commit规范
module.exports = {
    feat: true, // 新增功能
    fix: true, // bug 修复
    docs: true, // 文档更新
    style: true, // 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
    refactor: true, // 重构代码(既没有新增功能，也没有修复 bug)
    perf: true, // 性能, 体验优化
    test: true, // 新增测试用例或是更新现有测试
    build: true, // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
    ci: true, // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
    chore: true, // 不属于以上类型的其他类，比如构建流程, 依赖管理
    revert: true, // 回滚某个更早之前的提交
}