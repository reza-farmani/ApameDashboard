'use client'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { fetchSettings, updateSettings, Setting } from '../_lib/data-services'

export default function SettingsForm() {
  const [settings, setSettings] = useState<Setting[]>([])
  const { register, handleSubmit, reset } = useForm()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSettings()
        setSettings(data)
        const defaults: Record<string, any> = {}
        data.forEach(s => { defaults[s.name] = s.value })
        reset(defaults)
      } catch (err: any) {
        setMessage(`خطا در بارگذاری تنظیمات: ${err.message}`)
      }
    }

    load()
  }, [reset])

  const onSubmit = async (data: any) => {
    setLoading(true)
    setMessage('')
    try {
      const updates = settings.map(s => ({
        id: s.id,
        value: data[s.name] 
      }))
      await updateSettings(updates)
      setMessage('✅ تنظیمات ذخیره شد')
    } catch (err: any) {
      setMessage(`❌ خطا: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow max-w-md space-y-4">
      <h2 className="text-lg font-bold mb-4">تنظیمات</h2>

      <div>
        <label className="block mb-1">حداقل/حداکثر بازدید کارت</label>
        <input type="text" {...register('minmaxVisitCard')} className="border p-2 w-full" />
      </div>

      <div>
        <label className="block mb-1">ساعات کاری</label>
        <input type="text" {...register('workingHours')} className="border p-2 w-full" />
      </div>

      <div>
        <label className="block mb-1">حداکثر سفارش قابل قبول</label>
        <input type="number" {...register('maxAcceptOrder')} className="border p-2 w-full" />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  )
}
