import {
  ContextType,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Blocker, History, Transition } from 'history';
import {
  Navigator as BaseNavigator,
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';

interface Navigator extends BaseNavigator {
  block: History['block'];
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & {
  navigator: Navigator;
};

/**
 * @source https://github.com/remix-run/react-router/commit/256cad70d3fd4500b1abcfea66f3ee622fb90874
 */
function useBlocker(blocker: Blocker, when = true) {
  const { navigator } = useContext(
    NavigationContext
  ) as NavigationContextWithBlock;

  useEffect(() => {
    if (!when) {
      return;
    }

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. T O D O: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    // eslint-disable-next-line consistent-return
    return unblock;
  }, [navigator, blocker, when]);
}

//  showPrompt - modal on/off, when - prompt on/off
export function usePrompt(when: boolean) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<Transition | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const handleBlockedNavigation = useCallback(
    (tx: Transition) => {
      if (!confirmedNavigation && tx.location.pathname !== location.pathname) {
        setShowPrompt(true);
        setLastLocation(tx);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location.pathname]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname);
    }
  }, [confirmedNavigation, lastLocation, navigate]);

  useBlocker(handleBlockedNavigation, when);

  return { showPrompt, confirmNavigation, cancelNavigation };
}
