import { Component } from 'react'

// Keeps one failed section (e.g. a lazy chunk that did not load on a weak connection, or an old
// chunk after a redeploy) from unmounting the whole page. The section is simply left out.
export class SectionBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[topbeam] section skipped:', error?.message)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
