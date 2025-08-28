import LazyImage from './LazyImage';
import classnames from '@/utils/classnames';

/**
 * notion的图标icon
 * 可能是emoji 可能是 svg 也可能是 图片
 * @returns
 */
const NotionIcon = ({
  icon,
  className = '',
}: {
  icon: string;
  className?: string;
}) => {
  if (!icon) {
    return <></>;
  }

  if (icon.startsWith('http') || icon.startsWith('data:')) {
    return (
      <LazyImage
        src={icon}
        className={classnames('my-auto mr-1 inline h-8 w-8', className)}
      />
    );
  }

  return <span className={classnames('mr-1', className)}>{icon}</span>;
};

export default NotionIcon;
