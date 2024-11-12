# uni-scrollbar

`uni-scrollbar` 是一个轻量级的自定义滚动条库，旨在提供更高质量的滚动体验。它允许开发者在网页中替代默认浏览器滚动条，并支持自定义的滚动条样式、行为及动画效果。通过此库，您可以更精细地控制滚动条的外观、交互体验，甚至在页面中实现自定义的滚动比例。

## 特性

- **自定义滚动条**：完全自定义的垂直和水平滚动条。
- **自适应显示**：支持在鼠标进入时显示滚动条，离开后自动隐藏。
- **滚动条比例控制**：支持设置内容区域和滚动条滚动距离的比例。
- **最小尺寸设置**：可以设置滚动条的最小高度或宽度，保证滚动条不被缩得过小。
- **支持原生滚动条**：可以选择使用原生浏览器滚动条。
- **动态调整**：根据内容大小自动调整滚动条的长度与位置。

## 安装

```bash
npm install uni-scrollbar
```

## 使用

### 基本用法

```typescript
import UScrollbar from 'uni-scrollbar'

const container = document.querySelector('.scroll-container')
const scrollbar = new UScrollbar(container, {
  native: false,           // 是否使用原生滚动条，默认为 false
  ratio: 10,               // 滚动比例，默认为 10
  thumbMinSize: 8,         // 滚动条的最小高度/宽度，默认为 8
  alwaysShow: false        // 是否总是显示滚动条，默认为 false
})
```

### 配置项

```typescript
interface UScrollbarOptions {
  /**
   * @description 是否使用原生浏览器滚动条
   * @default false
   */
  native: boolean

  /**
   * @description 内容区域滚动距离和滚动条滚动距离的比例，可以理解为滚动速度
   * @default 10
   */
  ratio: number,

  /**
   * @description thumb的最小高度/宽度（纵向即是高度，横向就是宽度）
   * 当使用设置的ratio滚动条的高度/宽度会小于滚动条的最小高度/宽度时会自动扩大ratio以保证最小高度/宽度
   * @default 8
   */
  thumbMinSize: number,

  /**
   * @description 滚动条是否会在鼠标离开滚动区域后自动消失
   * 为true时，滚动条会一直显示，不会在鼠标离开滚动区域后消失
   * 为false时，滚动条会在鼠标离开滚动区域后消失
   * @default false
   */
  alwaysShow: boolean
}
```

### 自定义滚动条样式

您可以通过 CSS 自定义滚动条的外观：

```css
.uni-scrollbar-wrapper {
  position: relative;
  overflow: hidden;
}

.uni-scrollbar-rail {
  position: absolute;
  background-color: #f1f1f1;
  border-radius: 10px;
}

.uni-scrollbar-thumb {
  position: absolute;
  background-color: #888;
  border-radius: 10px;
}
```

### 方法

- `getScrollTop()`: 获取垂直滚动位置。
- `getScrollLeft()`: 获取水平滚动位置。
- `setScrollTop(value: number)`: 设置垂直滚动位置。
- `setScrollLeft(value: number)`: 设置水平滚动位置。
- `setScrollTo(x: number, y: number)`: 设置水平和垂直滚动位置。
- `setScrollTop(to: number, duration: number)`: 平滑滚动到指定垂直位置。
- `setScrollLeft(to: number, duration: number)`: 平滑滚动到指定水平位置。
- `getThumbTop()`: 获取垂直滚动条的当前位置。
- `getThumbLeft()`: 获取水平滚动条的当前位置。

### 事件

- `scroll`: 当容器滚动时触发。
- `mouseenter` 和 `mouseleave`: 控制滚动条显示与隐藏。

### 示例

```html
<div class="scroll-container">
  <div class="content">
    <!-- Your content goes here -->
  </div>
</div>

<script>
  const container = document.querySelector('.scroll-container');
  const scrollbar = new UScrollbar(container, {
    native: false, 
    ratio: 8, 
    thumbMinSize: 12, 
    alwaysShow: true 
  });
</script>
```

#### 查看示例

可以直接运行脚本查看 `examples` 下的示例。

```bash
npm run dev
```

## 贡献

我们欢迎任何形式的贡献！如果您有建议或者发现问题，请提出 Issue 或者提交 Pull Request。
