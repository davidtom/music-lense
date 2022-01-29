import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import {
  SheetsRegistry,
  createGenerateId,
  ThemeProvider,
  JssProvider,
} from "react-jss";

// TODO: define a theme
const theme = {};

export default class JssDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    // JSS setup from: https://github.com/vercel/next.js/tree/canary/examples/with-react-jss
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) =>
          (
            <ThemeProvider theme={theme}>
              <JssProvider registry={registry} generateId={generateId}>
                <App {...props} />
              </JssProvider>
            </ThemeProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    };
  }
}
