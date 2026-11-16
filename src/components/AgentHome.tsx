import { useMemo } from 'react';
import { useData, useSettings, createChatUi } from '../store';
import { useT } from '../i18nReact';
import { Icon, IconName } from './Icons';
import { relativeTime } from '../lib/chatContext';

/**
 * The Agent's own front door. Chat's welcome is a writing prompt; this is a
 * workbench: what the agent can reach right now, and the last jobs it ran.
 */
export function AgentHome() {
  const t = useT();
  const chats = useData((s) => s.chats);
  const projects = useData((s) => s.projects);
  const skills = useData((s) => s.skills);
  const mcpServers = useData((s) => s.mcpServers);
  const settings = useSettings();
  const navigate = useData((s) => s.navigate);
  const setActiveChat = useData((s) => s.setActiveChat);

  const recent = useMemo(
    () => chats.filter((c) => c.workspace === 'agent').slice(0, 5),
    [chats]
  );
  const toolsOn = settings.toolsEnabled;
  const mcpOn = mcpServers.filter((m) => Number(m.enabled) === 1).length;
  const skillCount = skills.filter((s) => Number(s.enabled) === 1).length;

  const cards: Array<{ key: string; icon: IconName; title: string; desc: string; onClick: () => void }> = [
    {
      key: 'plan', icon: 'sparkle',
      title: t('agent.homePlan'), desc: t('agent.homePlanDesc'),
      onClick: () => navigate('story-agent')
    },
    {
      key: 'flow', icon: 'target',
      title: t('agent.homeFlow'), desc: t('agent.homeFlowDesc'),
      onClick: () => navigate('flow')
    },
    {
      key: 'shelf', icon: 'book',
      title: t('agent.homeShelf'), desc: t('agent.homeShelfDesc'),
      onClick: () => navigate('write')
    }
  ];

  return (
    <div className="page agent-home">
      <header className="agent-home-head">
        <div className="ah-mark"><Icon name="tools" size={22} /></div>
        <div>
          <div className="wh-kicker">{t('agent.homeKicker')}</div>
          <h1>{t('agent.homeTitle')}</h1>
          <p className="sub">{t('agent.homeSub')}</p>
        </div>
        <button className="primary" onClick={() => { void createChatUi(t('agent.newSession'), null, 'agent'); }}>
          <Icon name="plus" size={14} /> {t('agent.newSession')}
        </button>
      </header>

      <div className="agent-bench">
        <div className="bench-cell">
          <span className={`bench-dot ${toolsOn ? 'on' : 'off'}`} />
          <b>{t('agent.benchTools')}</b>
          <span>{toolsOn ? t('agent.benchOn') : t('agent.benchOff')}</span>
        </div>
        <div className="bench-cell">
          <span className={`bench-dot ${mcpOn ? 'on' : 'off'}`} />
          <b>MCP</b>
          <span>{mcpOn ? t('agent.benchServers').replace('{n}', String(mcpOn)) : t('agent.benchNone')}</span>
        </div>
        <div className="bench-cell">
          <span className={`bench-dot ${skillCount ? 'on' : 'off'}`} />
          <b>{t('agent.benchSkills')}</b>
          <span>{skillCount ? t('agent.benchCount').replace('{n}', String(skillCount)) : t('agent.benchNone')}</span>
        </div>
        <div className="bench-cell">
          <span className={`bench-dot ${projects.length ? 'on' : 'off'}`} />
          <b>{t('agent.benchProjects')}</b>
          <span>{t('agent.benchCount').replace('{n}', String(projects.length))}</span>
        </div>
      </div>

      <div className="agent-home-grid">
        <div className="agent-home-cards">
          {cards.map((c) => (
            <button key={c.key} className="agent-home-card" onClick={c.onClick}>
              <span className="ahc-icon"><Icon name={c.icon} size={17} /></span>
              <span className="ahc-text">
                <b>{c.title}</b>
                <span>{c.desc}</span>
              </span>
              <Icon name="chevronRight" size={13} />
            </button>
          ))}
        </div>

        <div className="agent-recent">
          <div className="ar-head">
            <span>{t('agent.recentSessions')}</span>
            {recent.length > 0 && <span className="ar-count">{recent.length}</span>}
          </div>
          {recent.length === 0 ? (
            <div className="ar-empty">{t('agent.noSessions')}</div>
          ) : (
            recent.map((c) => (
              <button key={c.id} className="ar-row" onClick={() => setActiveChat(c.id)}>
                <Icon name="chat" size={13} />
                <span>{c.title}</span>
                <em>{relativeTime(c.updated_at || c.created_at, t)}</em>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
