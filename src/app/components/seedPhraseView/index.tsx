import { useMemo } from 'react';
import styled from 'styled-components';
import Eye from '@assets/img/createPassword/Eye.svg';
import SeedPhraseWord from './word';

interface SeedPhraseViewProps {
  seedPhrase: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}
interface SeedContainerProps {
  isVisible: boolean;
}

const Container = styled.div((props) => ({
  position: 'relative',
  paddingBottom: props.theme.spacing(20),
}));

const SeedContainer = styled.div<SeedContainerProps>((props) => ({
  display: 'grid',
  gridTemplateColumns: ' 100px 100px 100px',
  textAlign: 'center',
  margin: 0,
  columnGap: props.theme.spacing(3),
  paddingBottom: props.theme.spacing(17),
  paddingLeft: props.theme.spacing(5),
  filter: `blur(${props.isVisible ? 0 : '3px'})`,
}));

const OuterSeedContainer = styled.div((props) => ({
  backgroundColor: props.theme.colors.background['elevation-1'],
  border: `1px solid ${props.theme.colors.background.elevation3}`,
  borderRadius: props.theme.radius(1),
}));

const ShowSeedButton = styled.button((props) => ({
  ...props.theme.body_xs,
  color: props.theme.colors.white[0],
  backgroundColor: props.theme.colors.white[900],
  border: `1px solid ${props.theme.colors.white[600]}`,
  height: 36,
  width: 110,
  borderRadius: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  img: {
    marginRight: props.theme.spacing(4),
  },
  ':hover': {
    backgroundColor: props.theme.colors.white[850],
    border: `1px solid ${props.theme.colors.white[800]}`,
  },
  ':focus': {
    backgroundColor: props.theme.colors.white[600],
    border: `1px solid ${props.theme.colors.white[800]}`,
  },
}));

export default function SeedphraseView(props: SeedPhraseViewProps) {
  const { seedPhrase, isVisible, setIsVisible } = props;
  const seedPhraseWords = useMemo(() => seedPhrase?.split(' '), [seedPhrase]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container>
      <OuterSeedContainer>
        <SeedContainer isVisible={isVisible}>
          {seedPhraseWords.map((word, index) => (
            <SeedPhraseWord index={index} word={word} />
          ))}
        </SeedContainer>
      </OuterSeedContainer>

      {!isVisible && (
        <ShowSeedButton onClick={handleToggleVisibility}>
          <img src={Eye} alt="show-password" height={16} />
          Show
        </ShowSeedButton>
      )}
    </Container>
  );
}
