import { Loader } from 'components/Styled';
import { BallTriangle } from 'react-loader-spinner';

export const LoaderSpinner = ({ loading }) => {
  return (
    <Loader>
      <BallTriangle
        height={200}
        width={200}
        radius={5}
        color="lightgray"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={loading}
      />
    </Loader>
  );
};
