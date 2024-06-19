import { ContentPageData } from '../utilities/ContentPage';
import MarkdownRenderer from './MarkdownRenderer';

interface props {
    pageData: ContentPageData | undefined
}

const ContentView = ({ pageData } : props) => {
  return (
    <div>
      {pageData ? (
        <MarkdownRenderer markdownContent={pageData.content} />
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default ContentView;