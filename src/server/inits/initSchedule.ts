import * as schedule from 'node-schedule'
import getActivity from '../controllers/activity'
import momentHelper from '../../common/momentHelper'
/**
 * 计划任务 用来刷新数据，文件之类的
 */

export default {
    async init(app, { debug, logger }) {
        await this.runTaskForNight({ debug, logger })
        await this.runTaskEveryQuarter({ debug, logger })
    },
    /**
     * 每刻钟执行任务
     */
    async runTaskEveryQuarter({ debug, logger }) {
        //每刻钟执行任务
        let rule = new schedule.RecurrenceRule()
        rule.minute = [0, 15, 30, 45]
        let job = schedule.scheduleJob(rule, async () => {
            appUtils.log(`quarter schedule start on ${momentHelper.get()}`)
            logger.info(`quarter schedule start on ${momentHelper.get()}`)
            try {
                await this.quarterTasks({ debug, logger })
            } catch (e) {
                logger.error('计划任务(quarter schedule)执行时发生错误', e.message, e.stack)
                appUtils.error('计划任务(quarter schedule)执行时发生错误', e.message, e.stack)
            }
        })
    },
    /**
     * 每刻钟任务
     * @param param0 
     */
    async quarterTasks({ debug, logger }) {
        let { refreshEffactState } = getActivity({ debug, logger })
        await refreshEffactState()
    },
    /**
     * 启动夜间任务
     * @param param0 
     */
    async runTaskForNight({ debug, logger }) {
        //每天晚上11点半更新数据
        let rule = new schedule.RecurrenceRule()
        rule.hour = 4
        rule.minute = [15, 30, 45]
        let job = schedule.scheduleJob(rule, async () => {
            appUtils.log(`night schedule start on ${momentHelper.get()}`)
            logger.info(`night schedule start on ${momentHelper.get()}`)
            try {
                await this.nightTasks({ debug, logger })
            } catch (e) {
                logger.error('计划任务(night schedule)执行时发生错误', e.message, e.stack)
                appUtils.error('计划任务(night schedule)执行时发生错误', e.message, e.stack)
            }
        })
    },
    /**
     * 夜间任务
     * @param param0 
     */
    async nightTasks({ debug, logger }) {
        let { clearTempData } = getActivity({ debug, logger })
        await clearTempData()
    }
}