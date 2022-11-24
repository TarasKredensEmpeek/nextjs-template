import React, { FC, ReactElement, cloneElement, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TransitionProps } from '@mui/material/transitions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useIndexedStepStyles, useStandardStyles } from './useStyles';

export enum AccordionVariants {
  indexedSteps = 'indexedSteps',
  standard = 'standard',
}

interface ContentProps {
  expandedIndex?: number;
  handleNextStep?: (i: number) => void;
}

interface AccordionItemParams {
  name: string;
  content?: string | FC<ContentProps>;
}

interface AccordionProps {
  variant?: AccordionVariants;
  items: AccordionItemParams[];
  itemProps?: object;
  expandedIndex?: number;
  stepPrefixName?: string;
  handleExpand: (id: number) => void;
  children?: ReactElement;
  transitionProps?: TransitionProps;
}

const ExpandCollapseIcon: FC<{
  variant: AccordionVariants;
  expanded: boolean;
  className: string;
}> = ({ expanded, variant, className }) => {
  if (variant === AccordionVariants.indexedSteps) {
    return <ExpandMoreIcon className={className} data-enabled={expanded} />;
  }

  const ComponentIcon = expanded ? RemoveIcon : AddIcon;

  return <ComponentIcon className={className} data-enabled={expanded} />;
};

const Accordion: FC<AccordionProps> = ({
  items,
  variant = AccordionVariants.standard,
  children,
  itemProps = {},
  handleExpand,
  expandedIndex,
  stepPrefixName,
  transitionProps,
}) => {
  const indexedStepsStyles = useIndexedStepStyles();
  const standardStyles = useStandardStyles();
  const { t } = useTranslation();
  const isIndexedSteps = useMemo(
    () => variant === AccordionVariants.indexedSteps,
    [variant],
  );

  const styles = useMemo(
    () => (isIndexedSteps ? indexedStepsStyles : standardStyles),
    [isIndexedSteps, indexedStepsStyles, standardStyles],
  );

  return (
    <Grid container direction="column" wrap="nowrap">
      {items.map((item, index) => {
        const ItemComponent = item.content;
        let contentComponent;

        if (typeof ItemComponent !== 'string') {
          contentComponent = ItemComponent ? (
            <ItemComponent
              expandedIndex={expandedIndex}
              handleNextStep={handleExpand}
              {...(itemProps || {})}
            />
          ) : (
            cloneElement(children as ReactElement, {
              expandedIndex,
              handleNextStep: handleExpand,
            })
          );
        } else {
          contentComponent = ItemComponent;
        }

        const expanded = expandedIndex === index;
        const step = index + 1 >= 10 ? index + 1 : `0${index + 1}`;
        const label = isIndexedSteps
          ? `${stepPrefixName ? t(stepPrefixName) : 'Step'} ${step} /`
          : undefined;

        return (
          <MuiAccordion
            elevation={0}
            key={`accordion_${index}`}
            TransitionProps={transitionProps}
            expanded={expanded}
            disableGutters={!isIndexedSteps}
            onChange={() => handleExpand(index)}
            classes={{ root: styles.container }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandCollapseIcon
                  expanded={expanded}
                  variant={variant}
                  className={styles.icon}
                />
              }
              data-test={`accordion-step-${index + 1}`}
              classes={{
                root: styles.summary,
                content: styles.summaryContent,
              }}
            >
              {!!label && (
                <Typography
                  variant="subtitle2"
                  sx={{ textTransform: 'uppercase' }}
                >
                  {label}
                </Typography>
              )}

              {!!item.name && (
                <Typography
                  variant={isIndexedSteps ? 'input' : 'subtitle2'}
                  sx={{ textTransform: 'uppercase' }}
                >
                  {t(item.name)}
                </Typography>
              )}
            </AccordionSummary>

            <AccordionDetails
              data-test="step-details"
              className={styles.content}
            >
              {contentComponent}
            </AccordionDetails>
          </MuiAccordion>
        );
      })}
    </Grid>
  );
};

export default Accordion;
