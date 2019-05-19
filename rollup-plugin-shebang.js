export default function shebang() {
  return {
    name: 'banner',
    renderChunk(code) {
      return '#!/usr/bin/env node\n' + code
    }
  }
}
